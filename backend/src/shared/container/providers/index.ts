import { container } from "tsyringe";

import { IHashProvider } from "./HashProvider/IHashProvider";
import { HashProvider } from "./HashProvider/HashProvider";

import { iJsonWebToken } from "./JsonWebToken/IJsonWebToken";
import { JsonWebToken } from "./JsonWebToken/JsonWebToken";

container.registerSingleton<IHashProvider>('HashProvider', HashProvider)
container.registerSingleton<iJsonWebToken>('JsonWebToken', JsonWebToken)