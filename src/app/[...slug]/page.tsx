import { PageProps } from '../../../.next/types/app/page'

export default async function Page(props: PageProps) {
    const { slug } = props.params
    return (
        <main>
            <h1>Hallo von {JSON.stringify(slug)}!</h1>
        </main>
    )
}
