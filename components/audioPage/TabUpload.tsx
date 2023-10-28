import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecordAudioForm from "./RecordAudioForm";
import UploadAudioForm from "./UploadAudioForm";

export default function TabUpload() {
	return (
		<Tabs defaultValue="account" className="w-full py-3">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="record">Grabr audio</TabsTrigger>
				{/* TODO:  */}
				{/* <TabsTrigger value="upload">Subir audio</TabsTrigger> */}
			</TabsList>
			{/* <TabsContent value="record">
				<RecordAudioForm />
			</TabsContent> */}
			<TabsContent value="upload">
				<UploadAudioForm />
			</TabsContent>
		</Tabs>
	);
}


