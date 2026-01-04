//Defining the Tool type with properties for light and dark images(i-e; card images for different themes)
export type Tool = {
  id: number;
  title: string;
  description: string;
  href: string;
  imageLight: string;
  imageDark: string;
};