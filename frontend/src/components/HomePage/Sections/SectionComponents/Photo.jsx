import {Button} from "@/components/ui/button.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.jsx"
export const Photo = ({index, imageName}) => {
    return (
        <div key={index} className="aspect-square overflow-hidden group relative">
            <img
                src={`http://localhost:8080/photos/${imageName}`}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div
                className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity"></div>
            <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost"
                                className="bg-black/70 hover:bg-black text-white rounded-full w-12 h-12 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="py-0 px-0 border-0 text-white max-w-3xl max-h-[80vh] data-[state=open]:!animate-none data-[state=closed]:!animate-none">
                            <img
                                src={`http://localhost:8080/photos/${imageName}`}
                                alt={`Gallery image ${index + 1}`}
                                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                            />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}