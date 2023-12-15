// import { getMenu } from "@/api/menu";
// import { getPage } from "@/api/page";
// import { getProduct } from "@/api/products";
// import { firstLevelMenu } from "@/helpers/helpers";
// import { TopLevelCategory, TopPageModel } from "@/interfaces/page.interface";
// import { ProductModel } from "@/interfaces/product.interface";
// import { TopPageComponent } from "@/page-components";
// import { GetStaticPaths, Metadata } from "next";

// export async function generateMetadata({
//   params,
// }: {
//   params: { alias: string };
// }): Promise<Metadata> {
//   const page = await getPage(params.alias);
//   if (page) {
//     return {
//       title: page[0].metaTitle,
//       applicationName: page[0].metaDescription,
//       // openGraph: {
//       //   title: page?.[0].metaTitle,
//       //   description: page[0].metaDescription,
//       //   type: "article"
//       // },
//     };
//   } else {
//     return {
//       title: "page not found"
//     }
//   }
// }
import { getMenu } from "@/api/menu";
import { getPage } from "@/api/page";
import { getProduct } from "@/api/products";
import { API } from "@/app/api";
import { firstLevelMenu } from "@/helpers/helpers";
import { MenuItem } from "@/interfaces/menu.iterface";
import { TopLevelCategory, TopPageModel } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";
import { TopPageComponent } from "@/page-components";
import { TopPageComponentProps } from "@/page-components/TopPageComponent/TopPageComponent.props";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, Metadata } from "next";
import { notFound } from "next/navigation";
import { ParsedUrlQuery } from "querystring";

export const metadata: Metadata = {
  title: "Products Page",
};

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  const m = firstLevelMenu[0];
  const menu = await getMenu();
  paths = paths.concat(
    menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`))
  );
  return {
    paths,
    fallback: true,
  };
};

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}

export async function generateStaticParams() {
  const menu = await getMenu();
  const aliasList = menu.flatMap(item => item.pages.map(page => ({alias: page.alias})))
 return aliasList;
}

export const getPageProps = async (alias: string) => {
	const firstCategoryItem = firstLevelMenu[0];
	if (!firstCategoryItem) {
		return {
			notFound: true
		};
	}
	try {
		const page = await getPage(alias);
		// const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
		// 	category: page.category,
		// 	limit: 10
		// });
    let products;
      if (page) {
      products = await getProduct(page[0].category);
      
    }
    
    
    
		return {
			props: {
				firstCategory: firstCategoryItem.id,
				page,
				products
			}
		};
	} catch {
		return {
			notFound2: true
		};
	}
};




export default async function TopPage({params}: {params:{alias: string}})
//   firstCategory, page, products
// }: TopPageProps): JSX.Element 
{

  const props = await getPageProps(params.alias);


  const firstCategory = props.props?.firstCategory as TopLevelCategory;
  const page = props.props?.page![0] as TopPageModel;
  const products = props.props?.products as ProductModel[];
  
  // console.log(props.props?.page![0]);
  // console.log('product List ' + props.props?.products?.length);
  // const product = await getProduct("Финансовая аналитика");
  //  console.log(product);
    
  
  // const menu = await getMenu();
  // const test =  menu.flatMap(item => item.pages.map(page => ({alias: page.alias})))
  // const firstCategoryItem = firstLevelMenu.find(m => m.route === )

  // !const page = await getPage(params.alias);


  // return <div>Product {params.alias} {test.map(t => (
  //   <p>{t.alias}</p>
  // ))}</div>;
  // console.log(test);
  // const page = getCourse();

  // if (!page?.title) {

  //   return <>
  //   <h2>page not found</h2>
  //   </>
  // }

  return <TopPageComponent firstCategory={firstCategory} page={page} products={products}/>
    
}
