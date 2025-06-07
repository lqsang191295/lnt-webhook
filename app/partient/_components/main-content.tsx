import Content from "./content";
import Header from "./header";

export default function MainContent() {
  return <div className="flex-1 flex flex-col">
    <Header />
    <main className="bg-blue-100 flex-1 overflow-hidden">
      <Content />
    </main>
  </div>;
}
