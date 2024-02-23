import DashboardTable from '@/components/DashboardTable'

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
    const session = await auth()
    const user = session?.user

    if (!user) redirect('/')

    return (
        <main>
            <h1>Dashboard</h1>
            <DashboardTable />
        </main>
    )
}
