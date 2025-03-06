import {redirect} from "next/navigation";

export default function Profile({params}: { params: { id: string } }) {
    redirect(`${params.id}/info`);
}
