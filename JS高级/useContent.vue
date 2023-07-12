<template>
  <ds-app primary-color="var(--ds-turquoise)">
    <app-bar disabled-nav-icon />

    <v-main>
      <ds-welcome-page
        title="SPC Managed Kubernetes Service(MKS)"
        :subtitle="'SPC MKS is a managed service that makes it easy for you to use Kubernetes on SPC \n without needing to install and operate your own Kubernetes control plane.'"
        main-button-label="Get started"
        :main-button-router-link="{
          name: 'region',
          params: { region }
        }"
        :items="items"
        primary-color="turquoise"
      />
    </v-main>
  </ds-app>
</template>

<script setup>
import { useContext } from '@spc/ui-sdk/composables/useContext'

const { region, docsUrl } = useContext()

docsUrl.value = {
  ...docsUrl.value,
  myLink: 'https://www.example.com/my-link'
}

const items = computed(() => [
  {
    image: 'provision_cluster.svg',
    title: 'Provision an SPC MKS cluster',
    subtitle: 'Provision an SPC MKS cluster',
    routerLink: {
      name: 'region',
      params: { region: region.value }
    },
    learnMoreExternalLink: {
      href: docsUrl.value.myLink,
      target: '_blank'
    }
  }
])
</script>