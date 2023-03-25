import { imageAssetPath } from "../constants/system";

const getImagePath = (name: string) => {
  return `${imageAssetPath}/${name}`;
};

export const getEnemyImagePath = (name: string, extension = "png") => {
  return getImagePath(`enemy/${name}.${extension}`);
};

export const getPlayerImagePath = (name: string, extension = "png") => {
  return getImagePath(`player/${name}.${extension}`);
};

export const getActionCardImagePath = (name: string, extension = "png") => {
  return getImagePath(`action_card/${name}.${extension}`);
};
