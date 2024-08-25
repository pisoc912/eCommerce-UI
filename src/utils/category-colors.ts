import { CategoryEnum } from "src/app/models/category.enum";


export const CATEGORY_COLORS: { [key in CategoryEnum]: string } = {
  [CategoryEnum.TELEVISION]: 'chip-blue',
  [CategoryEnum.AUDIO]: 'chip-green',
  [CategoryEnum.COMPUTERS]: 'chip-orange',
  [CategoryEnum.APPLIANCES]: 'chip-red',
  [CategoryEnum.MOBILE_PHONES]: 'chip-purple',
  [CategoryEnum.GAMING]: 'chip-teal',
  [CategoryEnum.WEARABLES]: 'chip-pink',
  [CategoryEnum.CAMERAS]: 'chip-yellow',
  [CategoryEnum.HOME_AUTOMATION]: 'chip-brown',
  [CategoryEnum.HOME_APPLIANCES]: 'chip-gray',
  [CategoryEnum.PERSONAL_CARE]: 'chip-lime',
  [CategoryEnum.OUTDOOR]: 'chip-cyan',
  [CategoryEnum.SECURITY]: 'chip-indigo',
  [CategoryEnum.ACCESSORIES]: 'chip-amber',
  [CategoryEnum.MUSICAL_INSTRUMENTS]: 'chip-deep-purple',
  [CategoryEnum.ELECTRONICS]: 'chip-light-blue',
  [CategoryEnum.TABLETS]: 'chip-deep-orange',
};
