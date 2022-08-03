import { container } from 'tsyringe';

import { IHashProvider } from './HashProvider/IHashProvider';
import { HashProvider } from './HashProvider/HashProvider';
import { iJsonWebToken } from './JsonWebToken/IJsonWebToken';
import { JsonWebToken } from './JsonWebToken/JsonWebToken';
import { IFileStorageProvider } from './FileStorageProvider/IFileStorageProvider';
import { FileStorageProvider } from './FileStorageProvider/FileStorageProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
container.registerSingleton<iJsonWebToken>('JsonWebToken', JsonWebToken);
container.registerSingleton<IFileStorageProvider>('FileStorageProvider', FileStorageProvider);
