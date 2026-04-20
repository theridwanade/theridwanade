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
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  BookOpenTextIcon,
  CompassIcon,
  CpuIcon,
  MegaphoneIcon,
} from "lucide-react";

export default function Home() {
  const github = siteConfig.links.socials.find((link) => link.label === "GitHub")?.href;
  const maplocaleThread = "https://x.com/theridwanade/status/2042282489083736318?s=20";
  const maplocaleCore = "https://github.com/theridwanade/maplocale_core";
  const maplocaleConsole = "https://github.com/theridwanade/maplocale_console";

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--color-muted),transparent_45%),radial-gradient(circle_at_bottom_right,var(--color-accent),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-[linear-gradient(to_bottom,var(--color-muted),transparent)] opacity-60" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-10 md:px-10 md:py-14">
        <section className="space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/80 bg-background/80 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/65">
            <p className="font-heading text-lg tracking-tight">
              {siteConfig.brand.handle}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary">Software Engineer</Badge>
              <Badge variant="outline">Aspiring Public Speaker</Badge>
              <Badge variant="outline">Communicator</Badge>
            </div>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-7">
              <Badge variant="secondary" className="w-fit">
                {siteConfig.brand.name} / theridwanade
              </Badge>
              <h1 className="max-w-3xl font-heading text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {siteConfig.hero.headline}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {siteConfig.hero.subheadline}
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  Check out my GitHub
                </a>
                <a
                  href={siteConfig.links.newsletter}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                >
                  Subscribe to my newsletter
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <Card className="bg-card/90 py-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <CpuIcon className="size-4" />
                      Builder
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Software, open source, apps, and hardware projects.
                  </CardContent>
                </Card>
                <Card className="bg-card/90 py-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <BookOpenTextIcon className="size-4" />
                      Writer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Essays on science, society, technology, and criticism.
                  </CardContent>
                </Card>
                <Card className="bg-card/90 py-4 sm:col-span-2 xl:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <MegaphoneIcon className="size-4" />
                      Speaker
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Aspiring public speaker and communicator.
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="sticky top-6 w-full border-border/70 bg-card/92">
              <CardContent className="space-y-4 pt-6 text-sm text-muted-foreground">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl border bg-muted/20">
                  <Image
                    src={siteConfig.brand.imagePath}
                    alt="Portrait of Ridwan"
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="bg-card/85">
            <CardHeader>
              <CardTitle>Engineering</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {siteConfig.about.technical}
            </CardContent>
          </Card>
          <Card className="bg-card/85">
            <CardHeader>
              <CardTitle>Thinking</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {siteConfig.about.intellectual}
            </CardContent>
          </Card>
          <Card className="bg-card/85">
            <CardHeader>
              <CardTitle>Communication</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {siteConfig.about.community}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Background
            </p>
            <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
              Study, research, and experimentation
            </h2>
          </div>
          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle className="text-lg">Academic Journey</CardTitle>
              <CardDescription>
                {siteConfig.education.program} at {siteConfig.education.school}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p className="text-foreground/90">{siteConfig.education.focus}</p>
              {siteConfig.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Core Skills
            </p>
            <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
              Current interests and focus
            </h2>
          </div>
          {siteConfig.skills.backend.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {siteConfig.skills.backend.map((skill) => (
                <Badge key={skill} variant="secondary" className="h-7 px-3 text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Technical stack details will be published soon.
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {siteConfig.skills.interests.map((interest) => (
              <Badge key={interest} variant="outline" className="h-7 px-3 text-xs">
                {interest}
              </Badge>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              New Project
            </p>
            <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
              MapLocale
            </h2>
          </div>
          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CompassIcon className="size-5" />
                Verified geospatial infrastructure for roads, paths, and real-world routes
              </CardTitle>
              <CardDescription>
                MapLocale builds hyperlocal, ground-truth map data for Nigeria, starting with the
                University of Ilorin campus and the routes global maps often miss.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Link href="/projects/maplocale" className={cn(buttonVariants({ size: "sm" }))}>
                Explore MapLocale
              </Link>
              <a
                href={maplocaleThread}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                View Twitter Thread
              </a>
              <a
                href={maplocaleCore}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                maplocale_core
              </a>
              <a
                href={maplocaleConsole}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                maplocale_console
              </a>
              <span className="rounded-md border border-border/80 px-3 py-1 text-xs text-muted-foreground">
                Geospatial Data Infrastructure
              </span>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                Check out my projects and contributions on GitHub.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ size: "sm" }))}
              >
                Visit GitHub
                <ArrowUpRightIcon className="size-4" />
              </a>
            </CardContent>
          </Card>

          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle>Speaking</CardTitle>
              <CardDescription>
                Aspiring public speaker and communicator. Follow my channels for updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {siteConfig.links.socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  {item.label}
                </a>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Writing
            </p>
            <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
              Science, society, technology
            </h2>
          </div>
          <Card className="bg-card/90">
            <CardContent className="flex flex-wrap items-center gap-3 pt-6 text-sm text-muted-foreground">
              <p>
                Read my articles on Substack and my technical posts on dev.to.
              </p>
              {siteConfig.links.writing.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  {item.label}
                </a>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle>Follow</CardTitle>
              <CardDescription>
                Follow me on GitHub, LinkedIn, YouTube, and X (Twitter).
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {siteConfig.links.socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  {item.label}
                </a>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle>Contact</CardTitle>
              <CardDescription>
                Reach out for projects, research, events, or just to say hello.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {siteConfig.links.contact.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(buttonVariants({ size: "sm" }))}
                >
                  {item.label}
                </a>
              ))}
            </CardContent>
          </Card>
        </section>

        <Separator />

        <footer className="flex flex-col gap-2 pb-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Ridwan. All rights reserved.</p>
          <a
            href={siteConfig.links.socials.find((item) => item.label.includes("X"))?.href}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline"
          >
            @theridwanade
          </a>
        </footer>
      </div>
    </main>
  );
}