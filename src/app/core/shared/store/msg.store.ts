import { effect, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { MsgService } from "../services/msg.service";

type MsgState = {
  msg: string;  
};

const initialState: MsgState = {
  msg: '',
};

export const MsgStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),

  withProps(() => ({
    msgService: inject(MsgService),
  })),

  withComputed(() => ({
  })),

  withMethods(({ ...store }) => ({
    onMsg: signalMethod(({ msg }: { msg: string }) => {
      patchState(store, (state) => ({
        ...state,
        msg,
      }))
    }),
  })),

  withHooks(({ msgService, ...store }) => ({
    onInit() {
      effect(() => {
        msgService.openSnackBar(store.msg());
      });
    },
  })),
);
