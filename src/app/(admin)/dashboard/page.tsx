import DashboardTable from '@/components/DashboardTable'
import { authOptions } from '@/lib/auth'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Page() {
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (!user) redirect('/')

    return (
        <main>
            <h1>Dashboard</h1>
            <DashboardTable />
        </main>
    )
}
