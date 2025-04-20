import axios from 'axios';

export const checkHost = async (setName, setFormData = "", navigate) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/auth/host/home`,
      { withCredentials: true }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch user data");
    }

    const host = response.data.host;
    setName(host);

    if (setFormData) {
      setFormData((prev) => ({
        ...prev,
        address: host.address,
        city: host.city,
        state: host.state,
        zipCode: host.zipCode,
        country: host.country,
      }));
    }
  } catch (error) {
    if (error.response?.status === 401) {
      navigate("/host/login");
    }
  }
};
export const checkUser = async (setUser, navigate) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/auth/home`,
      { withCredentials: true }
    );
    if (response.status === 200) {
      setUser(response.data.user);
    }
  } catch (error) {
    if (error.response?.status === 401) {
      navigate("/log-in");
    } else {
      console.error("Error fetching user:", error.message);
    }
  }
};
