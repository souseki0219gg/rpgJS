import "../assets/images/enemy/mon_025r.png";
import "../assets/images/player/mon_234r.png";

import { imageAssetPath } from "../constants/system";

export const getEnemyImagePath = (name: String, extension: String = "png") => {
    return `${imageAssetPath}/enemy/${name}.${extension}`;
}

export const getPlayerImagePath = (name: String, extension: String = "png") => {
    return `${imageAssetPath}/player/${name}.${extension}`
}
