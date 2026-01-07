import { SelectedWorksClient, WorkItem } from "./SelectedWorksClient";

const WORKS_DATA: WorkItem[] = [
    {
        id: "01",
        title: "The Stone House",
        category: "Residences",
        location: "Dallas, TX",
        image: "/images/selected-works/casa-dallas.png",
        year: "2025",
        size: "large"
    },
    {
        id: "02",
        title: "Villa Las Colinas",
        category: "Estates",
        location: "Las Colinas, TX",
        image: "/images/selected-works/villa-las-colinas.png",
        year: "2024",
        size: "regular"
    },
    {
        id: "03",
        title: "Skyline Penthouse",
        category: "Interiors",
        location: "Uptown Dallas",
        image: "/images/selected-works/penthouse-uptown.png",
        year: "2025",
        size: "regular"
    },
    {
        id: "04",
        title: "Highland Park Estate",
        category: "Estates",
        location: "Highland Park",
        image: "/images/selected-works/estate-highland-park.png",
        year: "2024",
        size: "regular"
    },
    {
        id: "05",
        title: "Glass Residence",
        category: "Residences",
        location: "Preston Hollow",
        image: "/images/selected-works/residence-preston-hollow.png",
        year: "2025",
        size: "regular"
    },
    {
        id: "06",
        title: "Southlake Manor",
        category: "Estates",
        location: "Southlake, TX",
        image: "/images/selected-works/mansion-southlake.png",
        year: "2024",
        size: "regular"
    }
];

export function SelectedWorks() {
    return <SelectedWorksClient items={WORKS_DATA} />;
}
