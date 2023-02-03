import { assetPath } from "../settings/system.js";

export const getEnemyImagePath = (name, extension = "png") => {
    return `${assetPath}images/enemy/${name}.${extension}`;
}

export const getPlayerImagePath = (name, extension = "png") => {
    return `${assetPath}images/player/${name}.${extension}`;
}
