export interface MenuItem {
    id: string;
    codice: string;
    label: string;
    url: string;
    redirectUrl?: string;
    icon?: string;
    active: boolean;
}
