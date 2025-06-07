import { Label } from "@/components/ui/label";
import FileItem from "./file-item";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function Content() {
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
                            <div className="grid grid-cols-5 gap-2 mt-4">
                                <FileItem />
                                <FileItem />
                                <FileItem />
                                <FileItem />
                                <FileItem />
                                <FileItem />
                                <FileItem />
                                <FileItem />
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Ngày 06-06-2025</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-5 gap-2 mt-4">
                                <FileItem />
                                <FileItem />
                                <FileItem />
                                <FileItem />
                                <FileItem />
                                <FileItem />
                                <FileItem />
                                <FileItem />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </main>
        </div>
    </div>;
}
