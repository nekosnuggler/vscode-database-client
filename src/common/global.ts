"use strict";
import * as vscode from "vscode";
import { Node } from "../model/interface/node";
import { Constants } from "./constants";
import { join } from "path";

export class Global {

    public static context: vscode.ExtensionContext;
    private static mysqlStatusBarItem: vscode.StatusBarItem;

    public static getExtPath(...paths: string[]) {
        return join(Global.context.extensionPath, ...paths)
    }

    public static updateStatusBarItems(activeConnection: Node) {
        if (Global.mysqlStatusBarItem) {
            Global.mysqlStatusBarItem.text = Global.getStatusBarItemText(activeConnection);
        } else {
            Global.mysqlStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
            Global.mysqlStatusBarItem.text = Global.getStatusBarItemText(activeConnection);
            Global.mysqlStatusBarItem.show();
        }
    }

    private static getStatusBarItemText(activeConnection: Node): string {
        return `$(server) ${activeConnection.getHost()}` + (activeConnection.database ? ` $(database) ${activeConnection.database}` : "");
    }

    /**
     * get configuration from vscode setting.
     * @param key config key
     */
    public static getConfig<T>(key: string): T {
        return vscode.workspace.getConfiguration(Constants.CONFIG_PREFIX).get<T>(key);
    }

}