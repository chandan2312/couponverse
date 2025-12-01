"use client";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <div className="flex flex-wrap gap-2 py-4">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    {index > 0 && (
                        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">
                            /
                        </span>
                    )}
                    {item.href ? (
                        <a
                            href={item.href}
                            className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal hover:text-primary transition-colors"
                        >
                            {item.label}
                        </a>
                    ) : (
                        <span className="text-[#181311] dark:text-gray-100 text-sm font-medium leading-normal">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};
