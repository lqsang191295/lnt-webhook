'use client';

import { Label } from "@/components/ui/label";

export default function ContentToaThuoc() {
    // const params = useParams()
    // const patient_id = params.patient_id as string
    // const [loading, setLoading] = useState<boolean>(false);
    // const [data, setData] = useState<iFileOfPatientData[]>([]);

    // const fetchData = useCallback(async () => {
    //     try {
    //         setLoading(true);

    //         const filesData = await getFilePatientData(patient_id);

    //         console.log('filesData----------- ', filesData)

    //         setData(filesData)
    //     } catch (err) {
    //         console.error('Lỗi khi tải dữ liệu:', err)
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // }, [patient_id])

    // useEffect(() => {
    //     fetchData();
    // }, [fetchData])

    return <div className="w-full h-full p-4">
        <div className="w-full h-full bg-white rounded-2xl flex flex-col">
            <header className="p-4">
                <Label className="text-2xl">Files</Label>
            </header>

            <main className="gap-2 overflow-auto p-4 h-full">
                Toa thuoc
                {/* {!loading && <Accordion type="multiple" defaultValue={data.map((_, i) => `item-${i}`)}>
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
                } */}
            </main>
        </div>
    </div>;
}
