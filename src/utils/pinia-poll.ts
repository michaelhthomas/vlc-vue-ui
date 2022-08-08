/* eslint-disable no-unused-vars */
import { PiniaPluginContext, StateTree } from "pinia";

interface IPollOptions {
  enabled: boolean;
  interval: number;
  function: string;
}

declare module "pinia" {
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    /**
     * Poll a function to update the store.
     */
    poll?: IPollOptions;
  }
}

export function pollPlugin(context: PiniaPluginContext) {
  const {
    options: { poll },
    store,
  } = context;

  if (!poll || !poll.enabled) return;

  setInterval(() => store[poll.function](), poll.interval);
}
