import {
  ArrowUpRightIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  CircleDashedIcon,
  Clock3Icon,
  CompassIcon,
  DatabaseIcon,
  FolderGit2Icon,
  Layers3Icon,
  MapPinnedIcon,
  PenLineIcon,
  RouteIcon,
  SatelliteIcon,
  ScrollTextIcon,
  SparklesIcon,
  TargetIcon,
  WrenchIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteUrl } from "@/lib/data";
import { cn } from "@/lib/utils";

const maplocaleThread =
  "https://x.com/theridwanade/status/2042282489083736318?s=20";
const maplocaleCore = "https://github.com/theridwanade/maplocale_core";
const maplocaleConsole = "https://github.com/theridwanade/maplocale_console";

type UpdateStatus = "shipped" | "active" | "next";

interface ProjectUpdate {
  period: string;
  title: string;
  summary: string;
  status: UpdateStatus;
  focus: string[];
}

const projectUpdates: ProjectUpdate[] = [
  {
    period: "April 2026",
    title: "Pivoted from raw phone GPS to QGIS-grounded tracing",
    summary:
      "Field tests in Ilorin showed phone GPS drifted too far for trusted path capture, so mapping moved to controlled manual tracing with layered basemaps and local ground knowledge.",
    status: "active",
    focus: ["QGIS", "Ground-truth mapping", "Data quality"],
  },
  {
    period: "April 2026",
    title: "Built the first PostGIS ingestion backbone",
    summary:
      "maplocale_core established the geospatial backbone for linestrings, points, and polygons, creating a queryable foundation for route and place intelligence.",
    status: "shipped",
    focus: ["TypeScript", "PostGIS", "Spatial queries"],
  },
  {
    period: "Next milestone",
    title: "Standardize missions, segments, and zones",
    summary:
      "The next iteration will formalize map layer metadata and validation flow, enabling reliable ingestion from QGIS exports into production-ready spatial datasets.",
    status: "next",
    focus: ["Schema design", "Validation", "Ingestion pipeline"],
  },
];

const stackTiles = [
  { label: "TypeScript", Icon: WrenchIcon },
  { label: "PostGIS", Icon: DatabaseIcon },
  { label: "QGIS", Icon: Layers3Icon },
  { label: "OpenStreetMap", Icon: MapPinnedIcon },
  { label: "Satellite Overlays", Icon: SatelliteIcon },
  { label: "Route Geometry", Icon: RouteIcon },
];

export const metadata: Metadata = {
  title: "MapLocale | Hyperlocal Ground-Truth Maps for Nigeria",
  description:
    "MapLocale is a solo-built mapping project creating hyperlocal, ground-truth map data for Nigerian roads, footpaths, shortcuts, and points of interest that global platforms miss.",
  keywords: [
    "MapLocale",
    "Nigeria maps",
    "hyperlocal mapping Nigeria",
    "geospatial data",
    "ground truth GPS",
    "route data API",
    "University of Ilorin",
    "map data infrastructure",
    "logistics routing",
    "open source geospatial",
    "PostGIS",
    "QGIS",
  ],
  alternates: {
    canonical: "/projects/maplocale",
  },
  openGraph: {
    title: "MapLocale | Hyperlocal Ground-Truth Maps for Nigeria",
    description:
      "MapLocale documents and publishes verified, hyperlocal route data for Nigerian environments where major maps often fail.",
    type: "article",
    url: "/projects/maplocale",
    siteName: "Ridwan",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MapLocale | Hyperlocal Ground-Truth Maps for Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MapLocale | Hyperlocal Ground-Truth Maps for Nigeria",
    description:
      "A transparent, real-time build log for a Nigeria-first geospatial platform focused on ground-truth route data.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MapLocale",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${siteUrl}/projects/maplocale`,
  description:
    "MapLocale is a hyperlocal geospatial data project focused on collecting and publishing verified map data for roads, paths, and points of interest in underserved Nigerian environments.",
  creator: {
    "@type": "Person",
    name: "Ridwan",
  },
  keywords:
    "Nigeria maps, geospatial data, map data infrastructure, ground-truth GPS, routing API, University of Ilorin",
  featureList: [
    "Ground-truth GPS route collection",
    "Manual validation and tracing in QGIS",
    "Verification pipeline for route geometries",
    "Spatial database for validated map data",
    "Developer API for route and path access",
  ],
  areaServed: "Nigeria",
};

function StatusBadge({ status }: { status: UpdateStatus }) {
  if (status === "shipped") {
    return (
      <Badge variant="secondary" className="gap-1.5">
        <CheckCircle2Icon className="size-3.5" />
        Shipped
      </Badge>
    );
  }

  if (status === "active") {
    return (
      <Badge variant="default" className="gap-1.5">
        <Clock3Icon className="size-3.5" />
        In Progress
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="gap-1.5">
      <CircleDashedIcon className="size-3.5" />
      Next
    </Badge>
  );
}

export default function MapLocalePage() {
  return (
    <main className="relative overflow-hidden">
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--color-muted),transparent_40%),radial-gradient(circle_at_bottom_right,var(--color-accent),transparent_45%)]" />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-10 md:px-10 md:py-14">
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="w-fit gap-1.5">
              <CompassIcon className="size-3.5" />
              Project Spotlight
            </Badge>
            <Badge variant="outline" className="w-fit gap-1.5">
              <CalendarDaysIcon className="size-3.5" />
              Updated: April 2026
            </Badge>
          </div>
          <div className="space-y-4">
            <h1 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl">
              MapLocale: Building Hyperlocal Ground-Truth Maps for Nigeria
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              MapLocale is a solo-built geospatial project tackling a real pain
              point in Nigeria: global map platforms often fail to provide
              accurate routing and local context for everyday locations. The
              project focuses on collecting, validating, and publishing map data
              that reflects what exists on the ground.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Back to Home
            </Link>
            <Link
              href="mailto:ridwan@theridwanade.me"
              className={cn(buttonVariants({ size: "default" }))}
            >
              Partner with MapLocale
            </Link>
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ScrollTextIcon className="size-5 text-muted-foreground" />
            <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
              Live project log
            </h2>
          </div>
          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle>Recent updates</CardTitle>
              <CardDescription>
                Add each new update to the top of the projectUpdates list in
                this page so returning visitors always see the latest project
                state first.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {projectUpdates.map((update) => (
                <article
                  key={`${update.period}-${update.title}`}
                  className="rounded-lg border border-border/80 bg-background/60 p-4"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground/90">
                      {update.period}
                    </p>
                    <StatusBadge status={update.status} />
                  </div>
                  <h3 className="text-base font-semibold leading-snug">
                    {update.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {update.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {update.focus.map((item) => (
                      <Badge
                        key={item}
                        variant="outline"
                        className="text-[11px]"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </article>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SparklesIcon className="size-4" />
                Origin
              </CardTitle>
              <CardDescription>Launched in April 2026</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Built with NestJS, TypeScript, and PostGIS, MapLocale began as a
              transparent attempt to create reliable location data for
              underserved areas, starting from the University of Ilorin campus.
            </CardContent>
          </Card>
          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TargetIcon className="size-4" />
                Reality Check
              </CardTitle>
              <CardDescription>GPS bottlenecks discovered</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Early tests in Ilorin showed phone GPS drifted by several meters,
              indoors and outdoors, due to network conditions and consumer-grade
              GNSS limits. Automated traces alone were not reliable enough for
              high-trust routing.
            </CardContent>
          </Card>
          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenLineIcon className="size-4" />
                Pivot
              </CardTitle>
              <CardDescription>Manual ground-truth tracing</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              The process shifted to QGIS-based manual tracing with local domain
              knowledge and multi-layer overlays (OSM, ESRI satellite, and more)
              to produce cleaner and more trustworthy route geometries.
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers3Icon className="size-5 text-muted-foreground" />
            <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
              Icons and tool stack
            </h2>
          </div>
          <Card className="bg-card/90">
            <CardContent className="grid gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-3">
              {stackTiles.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-lg border border-border/80 bg-background/60 px-3 py-2"
                >
                  <div className="rounded-md border border-border/70 bg-muted/30 p-2">
                    <Icon className="size-4 text-foreground/80" />
                  </div>
                  <p className="text-sm font-medium">{label}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPinnedIcon className="size-5 text-muted-foreground" />
            <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
              Why this matters
            </h2>
          </div>
          <Card className="bg-card/90">
            <CardContent className="space-y-3 pt-6 text-sm leading-relaxed text-muted-foreground">
              <p>
                In many Nigerian cities and campuses, people still rely on calls
                and local knowledge because mainstream maps can route users to
                the wrong place or provide no useful route data at all. This
                affects logistics, commuting, emergency response, and local
                commerce.
              </p>
              <p>
                MapLocale fills high-impact gaps: walkable connections,
                shortcuts, blocked paths, and localized points of interest that
                global datasets often miss or update too late. The value is not
                just geometry, but verified, structured geospatial data.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <RouteIcon className="size-5 text-muted-foreground" />
            <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
              Current stage and next steps
            </h2>
          </div>
          <Card className="bg-card/90">
            <CardContent className="space-y-3 pt-6 text-sm leading-relaxed text-muted-foreground">
              <p>
                Current stage (April 2026): after a focused period learning and
                applying QGIS deeply, MapLocale is producing cleaner test traces
                with better overlays and controlled labeling.
              </p>
              <p>
                Immediate next steps: finalize a data model for missions,
                segments, zones, and metadata, then update maplocale_core to
                ingest, validate, and store QGIS-exported layers as a foundation
                for routing and wider expansion.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DatabaseIcon className="size-4" />
                Technical foundation
              </CardTitle>
              <CardDescription>Built for practical reliability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                Backend: TypeScript + PostGIS for linestrings, points, and
                polygons.
              </p>
              <p>
                Tools: maplocale_console + QGIS for manual tracing and layer
                validation.
              </p>
              <p>
                Future-ready architecture: compatible with improved collection
                methods such as RTK GPS while keeping human ground knowledge
                central.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CompassIcon className="size-4" />
                Project vision
              </CardTitle>
              <CardDescription>Complement, not replace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                MapLocale is not trying to replace global mapping products. It
                is designed to fill critical local blind spots with dependable,
                ground-truthed data.
              </p>
              <p>
                Every challenge and decision is documented publicly, making the
                work a real-time, open build log for Nigeria-first geospatial
                infrastructure.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <FolderGit2Icon className="size-5 text-muted-foreground" />
            <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
              Repository roles
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DatabaseIcon className="size-4" />
                  maplocale_core
                </CardTitle>
                <CardDescription>
                  The core backend for ingestion and geospatial data processing.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Core Backend</Badge>
                  <Badge variant="outline">Ingestion</Badge>
                  <Badge variant="outline">Validation</Badge>
                  <Badge variant="outline">PostGIS</Badge>
                </div>
                <p>
                  This service handles layer intake, processing rules, and
                  spatial persistence for MapLocale's trusted data pipeline.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CompassIcon className="size-4" />
                  maplocale_console
                </CardTitle>
                <CardDescription>
                  The operations dashboard for mappers and contributors.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Mapper Dashboard</Badge>
                  <Badge variant="outline">Contributor Ops</Badge>
                  <Badge variant="outline">Review Flow</Badge>
                </div>
                <p>
                  This interface supports mapping operations, contributor
                  coordination, and progress visibility for on-ground updates.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPinnedIcon className="size-5 text-muted-foreground" />
            <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
              Contribute from UNILORIN campus
            </h2>
          </div>
          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle>Partners and contributors welcome</CardTitle>
              <CardDescription>
                If you are on the University of Ilorin campus and want to
                partner or contribute, please reach out directly.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary">University of Ilorin</Badge>
              <Badge variant="outline">Partnership</Badge>
              <Badge variant="outline">Contributor Call</Badge>
              <Link
                href="mailto:ridwan@theridwanade.me"
                className={cn(buttonVariants({ size: "sm" }))}
              >
                Contact Ridwan
              </Link>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <FolderGit2Icon className="size-5 text-muted-foreground" />
            <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
              Follow the build
            </h2>
          </div>
          <Card className="bg-card/90">
            <CardContent className="flex flex-wrap gap-3 pt-6">
              <Link
                href={maplocaleThread}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ size: "sm" }))}
              >
                <PenLineIcon className="size-4" />
                Twitter Thread
                <ArrowUpRightIcon className="size-4" />
              </Link>
              <Link
                href={maplocaleCore}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                )}
              >
                <FolderGit2Icon className="size-4" />
                maplocale_core repository
                <ArrowUpRightIcon className="size-4" />
              </Link>
              <Link
                href={maplocaleConsole}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                )}
              >
                <FolderGit2Icon className="size-4" />
                maplocale_console repository
                <ArrowUpRightIcon className="size-4" />
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
