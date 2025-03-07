
import { useRef, useEffect } from 'react'
import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Mesh,
  Program,
  Texture,
} from 'ogl'

function debounce(func, wait) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance)
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance)
    }
  })
}

function createTextTexture(gl, text, font = "bold 30px monospace", color = "black") {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  context.font = font
  const metrics = context.measureText(text)
  const textWidth = Math.ceil(metrics.width)
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2)
  canvas.width = textWidth + 20
  canvas.height = textHeight + 20
  context.font = font
  context.fillStyle = color
  context.textBaseline = "middle"
  context.textAlign = "center"
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillText(text, canvas.width / 2, canvas.height / 2)
  const texture = new Texture(gl, { generateMipmaps: false })
  texture.image = canvas
  return { texture, width: canvas.width, height: canvas.height }
}

class Title {
  constructor({ gl, plane, renderer, text, textColor = "#545050", font = "30px sans-serif" }) {
    autoBind(this)
    this.gl = gl
    this.plane = plane
    this.renderer = renderer
    this.text = text
    this.textColor = textColor
    this.font = font
    this.createMesh()
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor
    )
    const geometry = new Plane(this.gl)
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    })
    this.mesh = new Mesh(this.gl, { geometry, program })
    const aspect = width / height
    const textHeight = this.plane.scale.y * 0.15
    const textWidth = textHeight * aspect
    this.mesh.scale.set(textWidth, textHeight, 1)
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05
    this.mesh.setParent(this.plane)
  }
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font
  }) {
    this.extra = 0
    this.geometry = geometry
    this.gl = gl
    this.image = image
    this.index = index
    this.length = length
    this.renderer = renderer
    this.scene = scene
    this.screen = screen
    this.text = text
    this.viewport = viewport
    this.bend = bend
    this.textColor = textColor
    this.borderRadius = borderRadius
    this.font = font
    this.createShader()
    this.createMesh()
    this.createTitle()
    this.onResize()
  }
  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false })
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        // Rounded box SDF for UV space
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          // Apply rounded corners (assumes vUv in [0,1])
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          if(d > 0.0) {
            discard;
          }
          
          gl_FragColor = vec4(color.rgb, 1.0);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    })
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = this.image
    img.onload = () => {
      texture.image = img
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]
    }
  }
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    })
    this.plane.setParent(this.scene)
  }
  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      fontFamily: this.font
    })
  }
  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra

    const x = this.plane.position.x
    const H = this.viewport.width / 2

    if (this.bend === 0) {
      this.plane.position.y = 0
      this.plane.rotation.z = 0
    } else {
      const B_abs = Math.abs(this.bend)
      const R = (H * H + B_abs * B_abs) / (2 * B_abs)
      const effectiveX = Math.min(Math.abs(x), H)

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX)
      if (this.bend > 0) {
        this.plane.position.y = -arc
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R)
      } else {
        this.plane.position.y = arc
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R)
      }
    }

    this.speed = scroll.current - scroll.last
    this.program.uniforms.uTime.value += 0.04
    this.program.uniforms.uSpeed.value = this.speed

    const planeOffset = this.plane.scale.x / 2
    const viewportOffset = this.viewport.width / 2
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal
      this.isBefore = this.isAfter = false
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal
      this.isBefore = this.isAfter = false
    }
  }
  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen
    if (viewport) {
      this.viewport = viewport
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height]
      }
    }
    this.scale = this.screen.height / 1500
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y]
    this.padding = 2
    this.width = this.plane.scale.x + this.padding
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index
  }
}

class App {
  constructor(container, { items, bend, textColor = "#ffffff", borderRadius = 0, font = "bold 30px DM Sans" } = {}) {
    document.documentElement.classList.remove('no-js')
    this.container = container
    this.scroll = { ease: 0.05, current: 0, target: 0, last: 0 }
    this.onCheckDebounce = debounce(this.onCheck, 200)
    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.onResize()
    this.createGeometry()
    this.createMedias(items, bend, textColor, borderRadius, font)
    this.update()
    this.addEventListeners()
  }
  createRenderer() {
    this.renderer = new Renderer({ alpha: true })
    this.gl = this.renderer.gl
    this.gl.clearColor(0, 0, 0, 0)
    this.container.appendChild(this.gl.canvas)
  }
  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 20
  }
  createScene() {
    this.scene = new Transform()
  }
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    })
  }
  createMedias(items, bend = 1, textColor, borderRadius, font) {
    const defaultItems = [
        { image: `https://images.unsplash.com/photo-1635023816996-6f5230d3f9b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGFqbWFoYWx8ZW58MHx8MHx8fDA%3D`, text: 'Delhi NCR' },
        { image: `https://images.unsplash.com/photo-1598434192043-71111c1b3f41?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R2F0ZXdheSUyMG9mJTIwSW5kaWF8ZW58MHx8MHx8fDA%3D`, text: 'Mumbai' },
        { image: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/01/e4/9c/more-far.jpg?w=1200&h=1200&s=1`, text: 'Bangalore' },
        { image: `https://images.unsplash.com/photo-1441911645956-df6e9bbc5496?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhcm1pbmFyfGVufDB8fDB8fHww`, text: 'Hyderabad' },
        { image: `https://www.mrpilot.in/blog/wp-content/uploads/2020/01/Kapaleeshwarar-Temple-Chennai.jpg`, text: 'Chennai' },
        { image: "data:image/jpeg;base64,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", text: 'Kolkata' },
        { image: `https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2023/08/31110743/HIFI-Jam-Travels-Shutterstock-Featured-1600x900.jpg`, text: 'Pune' },
        { image: `https://i0.wp.com/www.opindia.com/wp-content/uploads/2021/02/motera-Modi-stadium-Image-14-24-02-2021.jpg?fit=1248%2C702&ssl=1`, text: 'Ahmedabad' },
        { image: `https://images.unsplash.com/photo-1602643163983-ed0babc39797?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SGF3YSUyME1haGFsfGVufDB8fDB8fHww`, text: 'Jaipur' },
        { image: `https://s7ap1.scene7.com/is/image/incredibleindia/rock-garden-chandigarh-attr-hero-2?qlt=82&ts=1727353657552`, text: 'Chandigarh' }
    ]
    const galleryItems = items && items.length ? items : defaultItems
    this.mediasImages = galleryItems.concat(galleryItems)
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font
      })
    })
  }
  onTouchDown(e) {
    this.isDown = true
    this.scroll.position = this.scroll.current
    this.start = e.touches ? e.touches[0].clientX : e.clientX
  }
  onTouchMove(e) {
    if (!this.isDown) return
    const x = e.touches ? e.touches[0].clientX : e.clientX
    const distance = (this.start - x) * 0.05
    this.scroll.target = this.scroll.position + distance
  }
  onTouchUp() {
    this.isDown = false
    this.onCheck()
  }
  onWheel() {
    this.scroll.target += 2
    this.onCheckDebounce()
  }
  onCheck() {
    if (!this.medias || !this.medias[0]) return
    const width = this.medias[0].width
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width)
    const item = width * itemIndex
    this.scroll.target = this.scroll.target < 0 ? -item : item
  }
  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    }
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    })
    const fov = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect
    this.viewport = { width, height }
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport })
      )
    }
  }
  update() {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    )
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left'
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction))
    }
    this.renderer.render({ scene: this.scene, camera: this.camera })
    this.scroll.last = this.scroll.current
    this.raf = window.requestAnimationFrame(this.update.bind(this))
  }
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this)
    this.boundOnWheel = this.onWheel.bind(this)
    this.boundOnTouchDown = this.onTouchDown.bind(this)
    this.boundOnTouchMove = this.onTouchMove.bind(this)
    this.boundOnTouchUp = this.onTouchUp.bind(this)
    window.addEventListener('resize', this.boundOnResize)
    window.addEventListener('mousewheel', this.boundOnWheel)
    window.addEventListener('wheel', this.boundOnWheel)
    window.addEventListener('mousedown', this.boundOnTouchDown)
    window.addEventListener('mousemove', this.boundOnTouchMove)
    window.addEventListener('mouseup', this.boundOnTouchUp)
    window.addEventListener('touchstart', this.boundOnTouchDown)
    window.addEventListener('touchmove', this.boundOnTouchMove)
    window.addEventListener('touchend', this.boundOnTouchUp)
  }
  destroy() {
    window.cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.boundOnResize)
    window.removeEventListener('mousewheel', this.boundOnWheel)
    window.removeEventListener('wheel', this.boundOnWheel)
    window.removeEventListener('mousedown', this.boundOnTouchDown)
    window.removeEventListener('mousemove', this.boundOnTouchMove)
    window.removeEventListener('mouseup', this.boundOnTouchUp)
    window.removeEventListener('touchstart', this.boundOnTouchDown)
    window.removeEventListener('touchmove', this.boundOnTouchMove)
    window.removeEventListener('touchend', this.boundOnTouchUp)
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas)
    }
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px DM Sans"
}) {
  const containerRef = useRef(null)
  useEffect(() => {
    const app = new App(containerRef.current, { items, bend, textColor, borderRadius, font })
    return () => {
      app.destroy()
    }
  }, [items, bend, textColor, borderRadius, font])
  return (
    <div className='w-full h-full overflow-hidden cursor-grab active:cursor-grabbing' ref={containerRef} />
  )
}
