import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { siteConfig } from "@/lib/data";
import { ArrowUpRightIcon, BookOpenTextIcon, CpuIcon, MegaphoneIcon, SigmaIcon } from "lucide-react";

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
                Software engineer, communicator, and lifelong student of first principles.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                I build dependable software systems and aspire to become a public speaker
                who makes technical ideas clear, practical, and memorable. Philosophy,
                science, and mathematics shape how I reason, decide, and build.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg">Let&apos;s collaborate</Button>
                {siteConfig.projects.length > 0 ? (
                  <Button variant="outline" size="lg">
                    View selected work
                  </Button>
                ) : null}
              </div>
            </div>

            <Card className="w-full max-w-sm border-border/70 bg-card/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Avatar size="lg">
                    <AvatarFallback>RA</AvatarFallback>
                  </Avatar>
                  Ridwan
                </CardTitle>
                <CardDescription>
                  Engineering with clarity, speaking with intent.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
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
              Projects shaping backend craft
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
                    <Button variant="ghost" size="sm" className="w-fit">
                      Explore case study
                      <ArrowUpRightIcon className="size-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card/90">
              <CardContent className="pt-6 text-sm text-muted-foreground">
                Real project case studies will be added here as they are published.
              </CardContent>
            </Card>
          )}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle>Talk Ideas in Progress</CardTitle>
              <CardDescription>
                Topics I am preparing as an aspiring speaker.
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
                  Upcoming talk topics will appear here.
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
                  No public speaking events listed yet.
                </p>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}