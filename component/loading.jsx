export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-blue-500">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-b-fuchsia-800 border-dashed rounded-full animate-spin" />
                <p className="text-lg text-blue-600 font-semibold">Loading, please wait...</p>
            </div>
        </div>
    );
}
