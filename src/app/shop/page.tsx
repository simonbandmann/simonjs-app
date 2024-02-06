import { getStoreItems } from '@/actions'

export default async function Page() {
    const items = await getStoreItems()

    return (
        <main>
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
                    </li>
                ))}
            </ul>
        </main>
    )
}
