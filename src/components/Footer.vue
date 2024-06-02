<script lang="ts" setup>
import {
  SfIconFacebook,
  SfIconInstagram,
  SfIconPinterest,
  SfIconTwitter,
  SfIconYoutube,
  SfButton,
  SfLink,
  SfListItem,
} from "@storefront-ui/vue";
const categories = [
  {
    label: "How to buy",
    subcategories: [
      {
        subcategoryLabel: "Payment methods",
        link: "#",
      },
      {
        subcategoryLabel: "Order pickup",
        link: "#",
      },
      {
        subcategoryLabel: "Purchase status",
        link: "#",
      },
      {
        subcategoryLabel: "Track orders",
        link: "#",
      },
      {
        subcategoryLabel: "Returns",
        link: "#",
      },
    ],
  },
  {
    label: "Help",
    subcategories: [
      {
        subcategoryLabel: "Help centers",
        link: "#",
      },
      {
        subcategoryLabel: "Security & fraud",
        link: "#",
      },
      {
        subcategoryLabel: "Feedback",
        link: "#",
      },
      {
        subcategoryLabel: "Contact",
        link: "#",
      },
    ],
  },
  {
    label: "Services",
    subcategories: [
      {
        subcategoryLabel: "Gift cards",
        link: "#",
      },
      {
        subcategoryLabel: "Order pickup",
        link: "#",
      },
      {
        subcategoryLabel: "Purchase status",
        link: "#",
      },
      {
        subcategoryLabel: "Track orders",
        link: "#",
      },
    ],
  },
  {
    label: "About",
    subcategories: [
      {
        subcategoryLabel: "About us",
        link: "#",
      },
      {
        subcategoryLabel: "Order pickup",
        link: "#",
      },
      {
        subcategoryLabel: "Purchase status",
        link: "#",
      },
      {
        subcategoryLabel: "Track orders",
        link: "#",
      },
      {
        subcategoryLabel: "Returns",
        link: "#",
      },
    ],
  },
];
const socialMedia = [
  {
    label: "Facebook",
    link: "#",
    icon: SfIconFacebook,
  },
  {
    label: "Twitter",
    link: "#",
    icon: SfIconTwitter,
  },
  {
    label: "Instagram",
    link: "#",
    icon: SfIconInstagram,
  },
  {
    label: "Pinterest",
    link: "#",
    icon: SfIconPinterest,
  },
  {
    label: "Youtube",
    link: "#",
    icon: SfIconYoutube,
  },
];

const bottomLinks = [
  {
    label: "Terms",
    link: "#",
  },
  {
    label: "Privacy policy",
    link: "#",
  },
];
</script>
<template>
  <footer class="bg-neutral-100 pt-10">
    <div
      class="mx-auto grid max-w-[1536px] grid-cols-[1fr_1fr] justify-center px-4 pb-10 md:grid-cols-[repeat(4,1fr)] md:px-6"
    >
      <ul
        v-for="{ label, subcategories } in categories"
        :key="label"
        class="grid-cols grid xs:pb-4"
      >
        <li
          class="ml-4 font-body text-lg font-medium leading-7 text-neutral-900"
        >
          {{ label }}
        </li>
        <SfListItem
          v-for="{ subcategoryLabel, link } in subcategories"
          :key="subcategoryLabel"
          class="!bg-transparent py-2 font-body typography-text-sm"
        >
          <SfLink
            class="text-neutral-600 no-underline hover:!text-neutral-900 hover:underline active:!text-neutral-900 active:underline"
            variant="secondary"
            :href="link"
          >
            {{ subcategoryLabel }}
          </SfLink>
        </SfListItem>
      </ul>
    </div>
    <hr />

    <div class="mx-auto justify-end bg-neutral-900 px-4 py-10 md:flex md:py-6">
      <div class="flex justify-center gap-x-4 py-2 md:self-start">
        <SfButton
          v-for="{ label, link, icon } in socialMedia"
          :key="label"
          tag="a"
          square
          variant="tertiary"
          class="text-white hover:!bg-neutral-500 hover:text-white active:!bg-transparent active:text-white"
          :href="link"
          :aria-label="`Go to ${label} page`"
        >
          <component :is="icon" />
        </SfButton>
      </div>
      <div
        class="my-4 flex items-center justify-center gap-6 py-2 md:my-0 md:ml-auto"
      >
        <SfLink
          v-for="{ label, link } in bottomLinks"
          :key="label"
          variant="secondary"
          class="text-white no-underline typography-text-sm hover:text-white hover:underline active:text-white active:underline"
          :href="link"
        >
          {{ label }}
        </SfLink>
      </div>
    </div>
  </footer>
</template>
