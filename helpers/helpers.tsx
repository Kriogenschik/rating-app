import CoursesIcon from './icons/courses.svg'
import ServicesIcon from './icons/services.svg'
import BooksIcon from './icons/books.svg'
import ProductsIcon from './icons/products.svg'
import { TopLevelCategory } from "@/interfaces/page.interface";
import { FirstLevelMenuItem } from '@/interfaces/menu.iterface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
  {route: 'courses', name: "Courses", icon: <CoursesIcon/>, id: TopLevelCategory.Courses},
  {route: 'services', name: "Services", icon: <ServicesIcon/>, id: TopLevelCategory.Services},
  {route: 'books', name: "Books", icon: <BooksIcon/>, id: TopLevelCategory.Books},
  {route: 'products', name: "Products", icon: <ProductsIcon/>, id: TopLevelCategory.Products},
];

export const priceDolars = (price: number): string => (price / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").concat("$");
