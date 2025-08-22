import Editor from "./editor";

export default function MenuEditorPage({ params }: { params: { menuId: string } }) {
  return <Editor menuId={params.menuId} />;
}
