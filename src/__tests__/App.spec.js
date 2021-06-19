import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";

import App from "@/App.vue";
import Movies from '@/views/Movies';
import Docs from "@/views/Docs";

import { routes } from "@/router";

const flushPromises = () => new Promise(setImmediate);

jest.mock("@melhosseiny/vue-aurora");

jest.mock("@/views/Movies", () => ({
  name: "Movies",
  render: h => h("div")
}));

jest.mock("@/views/Docs", () => ({
  name: "Docs",
  render: h => h("div")
}));

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("App", () => {
  it('renders a Movies view when base route is pushed', async () => {
    const router = new VueRouter({
      mode: 'history',
      routes
    });

    const wrapper = mount(App, {
      localVue,
      router
    });

    router.push("/");

    await flushPromises();
    expect(wrapper.findComponent(Movies).exists()).toBe(true);
  })

  it('renders a Docs view when /docs route is pushed', async () => {
    const router = new VueRouter({
      mode: 'history',
      routes
    });

    const wrapper = mount(App, {
      localVue,
      router
    });

    router.push("/docs");

    await flushPromises();
    expect(wrapper.findComponent(Docs).exists()).toBe(true);
  })
})
