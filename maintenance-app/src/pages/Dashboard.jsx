
import { useState } from "react";
import Properties from "./Properties";
import { getRegistryData } from "../services/propertyService";

import {
    LayoutDashboard,
    Building2,
    ClipboardList,
    Users,
    Settings,
    Menu,
    X,
} from "lucide-react";

const navigation = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Properties", icon: Building2 },
    { label: "Maintenance", icon: ClipboardList },
    { label: "Tenants", icon: Users },
    { label: "Settings", icon: Settings },
];

export default function Dashboard() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activePage, setActivePage] = useState("Dashboard");
    const [registry] = useState(getRegistryData);

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800">
            {/* Mobile header */}
            <header className="flex items-center justify-between bg-slate-900 p-4 text-white md:hidden">
                <h1 className="text-lg font-bold">LIVINGSTONE</h1>

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation"
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </header>

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside
                    className={`${mobileMenuOpen ? "block" : "hidden"
                        } fixed inset-y-0 left-0 z-20 w-64 bg-slate-900 p-6 text-white md:static md:block`}
                >
                    <div className="mb-10 hidden text-xl font-bold md:block">
                        LIVINGSTONE
                    </div>

                    <div className="mb-6 flex items-center justify-between md:hidden">
                        <span className="font-bold">Navigation</span>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close navigation"
                        >
                            <X />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {navigation.map(({ label, icon: Icon }) => (
                            <button
                                key={label}
                                onClick={() => {
                                    setActivePage(label);
                                    setMobileMenuOpen(false);
                                }}
                                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-300 transition hover:bg-slate-800 hover:text-white"
                            >
                                <Icon size={19} />
                                {label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main dashboard */}
                <main className="min-w-0 flex-1 p-5 md:p-8">
                    {activePage === "Properties" ? (
                        <Properties />
                    ) : (
                        <>
                            {
                                <main className="min-w-0 flex-1 p-5 md:p-8">
                                    <div className="mb-8">
                                        <p className="text-sm text-slate-500">
                                            Livingstone Management
                                        </p>
                                        <h2 className="mt-1 text-2xl font-bold">
                                            Management Dashboard
                                        </h2>
                                        <p className="mt-2 text-slate-500">
                                            Overview of your property operations.
                                        </p>
                                    </div>

                                    {/* Statistics */}
                                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                        {[
                                            ["Properties", registry.properties.length],
                                            ["Buildings", registry.buildings.length],
                                            ["Units", registry.units.length],
                                            ["Maintenance Requests", 0],
                                        ].map(([label, value]) => (
                                            <div
                                                key={label}
                                                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                                            >
                                                <p className="text-sm text-slate-500">{label}</p>
                                                <p className="mt-3 text-3xl font-bold">{value}</p>
                                            </div>
                                        ))}
                                    </section>

                                    {/* Recent activity */}
                                    <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                        <h3 className="text-lg font-semibold">
                                            Recent Maintenance Requests
                                        </h3>

                                        <div className="py-12 text-center">
                                            <ClipboardList
                                                className="mx-auto mb-3 text-slate-400"
                                                size={36}
                                            />
                                            <p className="font-medium text-slate-600">
                                                No maintenance requests yet
                                            </p>
                                            <p className="mt-1 text-sm text-slate-400">
                                                Submitted requests will appear here.
                                            </p>
                                        </div>
                                    </section>
                                </main>
                            }
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
