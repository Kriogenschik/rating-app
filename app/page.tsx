import { Button, Htag, PTag, Rating, Tag } from "@/components";

export default async function Home(): Promise<JSX.Element> {  
  return (
    <main>
      <Htag tag="h1">Text</Htag>
      <Tag size="m" color="red" href="#">
        Lorem{" "}
      </Tag>
      <PTag size="lg">
        
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
        consectetur maiores cumque officiis possimus non minus exercitationem
        cupiditate corporis ex eius dolorem, alias ducimus deserunt. Aperiam
        voluptatem harum eligendi repudiandae.
      </PTag>
      <Button appearance="primary" arrow="right">
        Button
      </Button>
      <Button appearance="ghost" arrow="right">
        Button
      </Button>
      <Rating rating={4} isEditable />
    </main>
  );
}

