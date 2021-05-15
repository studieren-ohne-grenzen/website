<template>
  <div class="flex items-start flex-wrap">
    <div
      class="
        md:w-1/2
        max-h-60
        sm:max-h-96
        md:max-h-full
        mx-auto
        flex-shrink-0
        md:pr-8
        relative
      "
    >
      <a
        href="#aachen-zweigverein"
        class="absolute flex items-center"
        style="top: 50.5%; left: -0.5%"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-6 fill-white stroke-sogblue-dark"
        >
          <path
            d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
          />
        </svg>
        <div class="text-white leading-none">Aachen</div>
      </a>
      <Map-Germany class="fill-current text-sogblue-dark" />
    </div>
    <div class="md:w-1/2 mt-2">
      <h2 class="text-sogblue font-light text-2xl sm:text-3xl">
        Aachen (Zweigverein)
      </h2>
      <div class="my-4">
        <nuxt-picture src="lokalgruppen/aachen.jpg" />
      </div>
      <div>
        Der Zweigverein Aachen trifft ist am Stipendienprogramm Mweso beteiligt,
        wobei in Aachen das Bücherprojekt angesiedelt ist. Wir veranstalten
        zahlreiche Benefiz-Veranstaltungen, wie die Nacht der Profs und schaffen
        Bewusstsein für die Themen von SOG durch Podiumsdiskussionen und
        Filmabende. Schau doch mal vorbei!
      </div>
      <a href="mailto://aachen@studieren-ohne-grenzen.org">Mail</a>
      <a href="https://www.facebook.com/sogaachen">Facebook</a>
      <a href="https://www.instagram.com/sog_aachen/">Instagram</a>
    </div>
  </div>
</template>

<script>
import MapGermany from './mapGermany'

export default {
  name: 'SogMap',
  components: { MapGermany },
}
</script>
