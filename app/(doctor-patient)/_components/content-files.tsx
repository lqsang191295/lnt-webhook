'use client';

import { Label } from "@/components/ui/label";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import ImageGallery from "@/components/image-gallery";
import { useCallback, useEffect, useState } from "react";
import { iFileOfPatientData } from "@/types/patient";
import { getFilePatientData } from "../_actions";
import { useParams } from "next/navigation";
import Spinner from "@/components/spinner";

export default function ContentFiles() {
    const params = useParams()
    const patient_id = params.patient_id as string
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<iFileOfPatientData[]>([]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);

            const filesData = await getFilePatientData(patient_id);

            console.log('filesData----------- ', filesData)

            setData(filesData)
        } catch (err) {
            console.error('Lỗi khi tải dữ liệu:', err)
        }
        finally {
            setLoading(false);
        }
    }, [patient_id])

    useEffect(() => {
        fetchData();
    }, [fetchData])

    return <div className="w-full h-full">
        <div className="w-full h-full bg-white flex flex-col">
            <header className="p-4">
                <Label className="text-2xl">Files</Label>
            </header>

            <main className="gap-2 overflow-auto p-4 h-full">
                {!loading && <Accordion type="multiple" defaultValue={data.map((_, i) => `item-${i}`)}>
                    {
                        data.map((d, i) => {
                            return <AccordionItem value={`item-${i}`} key={`AccordionItem-${i}`}>
                                <AccordionTrigger>Ngày {d.dateFolder}</AccordionTrigger>
                                <AccordionContent>
                                    <ImageGallery files={d.files} />
                                </AccordionContent>
                            </AccordionItem>
                        })
                    }
                </Accordion>}
                {
                    loading && <div className="w-full h-full flex justify-center items-center gap-2">
                        <Spinner /> <Label>Loading...</Label>
                    </div>
                }
            </main>
        </div>
    </div>;
}
