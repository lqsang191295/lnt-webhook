import { Label } from "@/components/ui/label";
import FileItem from "./file-item";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import ImageGallery from "@/components/image-gallery";

export default function Content() {
    const images = ["/imgs/logo.png", "/icons/chatgpt-icon.svg",
        "/icons/deepseek-logo-icon.svg", "/icons/google-gemini-icon.svg", "/icons/grok-logo-icon.svg", "/icons/perplexity-ai-icon.svg"]

    return <div className="w-full h-full p-4">
        <div className="w-full h-full bg-white rounded-2xl flex flex-col">
            <header className="p-4">
                <Label className="text-2xl">Files</Label>
            </header>

            <main className="gap-2 overflow-auto p-4">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Ngày 06-06-2025</AccordionTrigger>
                        <AccordionContent>
                            <ImageGallery images={images} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Ngày 06-06-2025</AccordionTrigger>
                        <AccordionContent>
                            <ImageGallery images={images} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </main>
        </div>
    </div>;
}
