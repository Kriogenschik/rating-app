import { getMenu } from "@/api/menu";
import { getPage } from "@/api/page";
import { getProduct } from "@/api/products";
import { firstLevelMenu } from "@/helpers/helpers";
import { TopLevelCategory, TopPageModel } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";
import { TopPageComponent } from "@/page-components";

import { Metadata } from "next";
import { Error404 } from "./404";

export async function generateMetadata({
  params,
}: {
  params: { alias: string };
}): Promise<Metadata> {
  const page = await getPage(params.alias);
  if (page && page[0]) {
    return {
      title: page[0].metaTitle,
      applicationName: page[0].metaDescription,
      // openGraph: {
      //   title: page?.[0].metaTitle,
      //   description: page[0].metaDescription,
      //   type: "article"
      // },
    };
  } else {
    return {
      title: "page not found",
    };
  }
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   let paths: string[] = [];
//   const m = firstLevelMenu[0];
//   const menu = await getMenu();
//   paths = paths.concat(
//     menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`))
//   );
//   return {
//     paths,
//     fallback: true,
//   };
// };

interface PageProps extends Record<string, unknown> {
  props: {
    firstCategory: TopLevelCategory;
    page: TopPageModel[];
    products?: ProductModel[];
  };
}

export async function generateStaticParams() {
  const menu = await getMenu();
  const aliasList = menu.flatMap((item) =>
    item.pages.map((page) => ({ alias: page.alias }))
  );
  return aliasList;
}
const getPageProps = async (alias: string): Promise<PageProps | null> => {
  const firstCategoryItem = firstLevelMenu[0];
  if (!firstCategoryItem) {
    return null;
    // notFound: true,
  }
  try {
    const page = (await getPage(alias)) as TopPageModel[];
    // const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
    // 	category: page.category,
    // 	limit: 10
    // });
    let products;
    if (page) {
      products = (await getProduct(page[0].category)) as ProductModel[];
    }

    return {
      props: {
        firstCategory: firstCategoryItem.id,
        page,
        products,
      },
    };
  } catch {
    return null;
    // notFound: true,
    // };
  }
};

export default async function TopPage({
  params,
}: {
  params: { alias: string };
}) {
  const props = await getPageProps(params.alias);

  const firstCategory = props?.props.firstCategory as TopLevelCategory;
  const page = props?.props.page![0] as TopPageModel;
  const products = props?.props.products as ProductModel[];

  if (!page || !products) {
    return <Error404 />;
  }

  return (
    <>
      <TopPageComponent
        firstCategory={firstCategory}
        page={page}
        products={products}
      />
    </>
  );
}
