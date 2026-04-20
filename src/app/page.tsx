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
import { ArrowUpRightIcon, BookOpenTextIcon, CpuIcon, GraduationCapIcon, MegaphoneIcon, SigmaIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--color-muted),transparent_42%),radial-gradient(circle_at_bottom_right,var(--color-accent),transparent_38%)]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-12 md:px-10 md:py-16">
        <section className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/80 bg-background/80 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/65">
            <p className="font-heading text-lg tracking-tight">{siteConfig.brand.handle}</p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary">Software Engineer</Badge>
              <Badge variant="outline">Aspiring Public Speaker</Badge>
              <Badge variant="outline">Communicator</Badge>
            </div>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                {siteConfig.brand.name} / theridwanade
              </Badge>
              <h1 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {siteConfig.hero.headline}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {siteConfig.hero.subheadline}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={siteConfig.links.socials[0]?.href}
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
            </div>

            <Card className="w-full max-w-sm border-border/70 bg-card/90">
              <CardHeader>
                <CardTitle className="text-lg">Ridwan</CardTitle>
                <CardDescription>
                  Engineering with clarity, speaking with intent.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl border">
                  <Image
                    src={siteConfig.brand.imagePath}
                    alt="Portrait of Ridwan"
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover"
                    priority
                  />
                </div>
                <p className="flex items-center gap-2">
                  <CpuIcon className="size-4" />
                  Software Engineer
                </p>
                <p className="flex items-center gap-2">
                  <MegaphoneIcon className="size-4" />
                  Aspiring Public Speaker
                </p>
                <p className="flex items-center gap-2">
                  <BookOpenTextIcon className="size-4" />
                  Philosophy and Science Enthusiast
                </p>
                <p className="flex items-center gap-2">
                  <SigmaIcon className="size-4" />
                  Mathematics Lover
                </p>
                <p className="flex items-center gap-2">
                  <GraduationCapIcon className="size-4" />
                  {siteConfig.education.school}
                </p>
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
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>{siteConfig.education.focus}</p>
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
              Built for reliability and clarity
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
              Selected Work
            </p>
            <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
              Projects and open-source work
            </h2>
          </div>
          {siteConfig.projects.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {siteConfig.projects.map((project) => (
                <Card key={project.slug} className="bg-card/90">
                  <CardHeader>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge key={`${project.slug}-${tag}`} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <a
                      href="#"
                      className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-fit")}
                    >
                      Explore case study
                      <ArrowUpRightIcon className="size-4" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card/90">
              <CardContent className="pt-6 text-sm text-muted-foreground">
                Check out my projects and contributions on GitHub.
                <a
                  href={siteConfig.links.socials[0]?.href}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2 inline-flex items-center gap-1 underline underline-offset-4"
                >
                  Visit GitHub
                  <ArrowUpRightIcon className="size-3" />
                </a>
              </CardContent>
            </Card>
          )}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle>Talk Ideas in Progress</CardTitle>
              <CardDescription>
                I am an aspiring public speaker and communicator.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {siteConfig.talkAbstracts.length > 0 ? (
                siteConfig.talkAbstracts.map((talk) => (
                  <article key={talk.title} className="space-y-1 rounded-lg border p-3">
                    <h3 className="font-heading text-sm">{talk.title}</h3>
                    <p className="text-sm text-muted-foreground">{talk.description}</p>
                  </article>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Check out my channels to stay updated with me.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle>Speaking Timeline</CardTitle>
              <CardDescription>Planned and recent speaking engagements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {siteConfig.speaking.length > 0 ? (
                siteConfig.speaking.map((item) => (
                  <div
                    key={`${item.topic}-${item.date}`}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{item.topic}</p>
                      <p className="text-xs text-muted-foreground">{item.venue}</p>
                    </div>
                    <Badge>{item.date}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No events listed yet.
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
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
              <CardTitle>Writing</CardTitle>
              <CardDescription>
                Articles on science, society, technology, and technical writing.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
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
          <p>@theridwanade</p>
        </footer>
      </div>
    </main>
  );
}