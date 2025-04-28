export default function Loading() {
    return (
        <div className="absolute inset-0 flex items-center justify-center flex-col space-y-4 bg-[#6960ec]">
            <div className="w-16 h-16 border-4 border-b-fuchsia-800 border-dashed rounded-full animate-spin" />
            <p className="text-lg text-amber-100 font-semibold">Loading, please wait...</p>
        </div>
    );
}
