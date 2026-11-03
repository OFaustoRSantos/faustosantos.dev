import { pageMetadata, renderPage, type PageProps } from "../../../lib/page";
import { staticRoutes } from "../../../lib/content";

export const dynamicParams = false;
export const generateStaticParams = staticRoutes;
export const generateMetadata = (props: PageProps) => pageMetadata(props, "en");
export default function Page(props: PageProps) { return renderPage(props, "en"); }
