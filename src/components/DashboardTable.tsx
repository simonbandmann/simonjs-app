import { getStoreItems } from '@/actions'
import AddItemDialog from './AddItemDialog'
import { Suspense } from 'react'
import StoreItemElement from './StoreItemElement'

const DashboardTable = async () => {
    const items = await getStoreItems()

    return (
        <div>
            <AddItemDialog />
            <Suspense fallback='Loading store data...'>
                <ul className='dashboard-container'>
                    {items.map((item) => (
                        <StoreItemElement key={item.id} item={item} />
                    ))}
                </ul>
            </Suspense>
        </div>
    )
}

export default DashboardTable
