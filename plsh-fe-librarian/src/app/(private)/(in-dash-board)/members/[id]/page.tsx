import {redirect} from "next/navigation";

export default async function Profile({params}: { params: Promise<{ id: string }> }) {
    const parameters = await params;
    redirect(`${parameters.id}/info`);
}
