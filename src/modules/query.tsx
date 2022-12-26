import { getApiClient } from "src/modules/axios";

export const getAlbums = (search: string) => {
  return getApiClient().get(`/search?term=${search}`);
};
