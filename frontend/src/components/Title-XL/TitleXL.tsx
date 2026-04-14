export default function TitleXL({ title, description }: { title: string, description?: string }) {
    return (
        <>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
        </>
    );
}