// PATH: frontend/src/features/scrape/scrapeService.jsx

import axios from "axios";

const scrapeDrivers = async (source: string) => {
  return await axios.get(process.env.VITE_API_URL + "scrape/drivers/", {
    params: { source: source },
  });
};

const ScrapeService = { scrapeDrivers };

export default ScrapeService;
