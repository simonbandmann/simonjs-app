import { getStoreItems } from '@/actions'
import AddItemDialog from '@/components/AddItemDialog'

import { auth } from '@/lib/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Page() {
    const session = await auth()
    const user = session?.user

    if (!user) redirect('/')

    const items = await getStoreItems()

    return (
        <main>
            <h1>Dashboard</h1>
            <AddItemDialog />
            <div>
                <ul>
                    {items.map((item) => (
                        <li
                            key={item.id}
                            style={{
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <div style={{ fontWeight: 900 }}>{item.name}</div>
                            <div style={{ fontSize: '0.8rem' }}>
                                {item.description}
                            </div>
                            {item.image?.map((img, index) => (
                                <Image
                                    key={index}
                                    src={`/static/images/${img}`}
                                    alt='alt'
                                    width={200}
                                    height={200}
                                />
                            ))}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}
