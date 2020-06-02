﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace collab_auth_api.Services
{
    public interface IEncryptionService
    {
        EncyptionKey GetEncryptionKey();

        string Decipher(string cipherText);
    }

    public class AESEncyption : IEncryptionService
    {
        public EncyptionKey GetEncryptionKey()
        {
            //  return new EncyptionKey() { Key = "C17AE4DA27D7397094AD70F9A9583B21", IV = "F5D9A5588C191661" };
            return new EncyptionKey() { Key = "1234123456785678", IV = "4566456678997899" };
        }

        public string Decipher(string cipherText)
        {
            string plainText = string.Empty;

            EncyptionKey encKey = GetEncryptionKey();

            byte[] pwd = Convert.FromBase64String(cipherText);

            using (RijndaelManaged aes = new RijndaelManaged())
            {
                aes.Mode = CipherMode.CBC;
                aes.Padding = PaddingMode.PKCS7;
                aes.BlockSize = 128;
                aes.KeySize = 256;

                aes.Key = Encoding.UTF8.GetBytes(encKey.Key);
                aes.IV = Encoding.UTF8.GetBytes(encKey.IV);

                using (ICryptoTransform decrypt = aes.CreateDecryptor(aes.Key, aes.IV))
                {
                    byte[] decryptedText = decrypt.TransformFinalBlock(pwd, 0, pwd.Length);

                    plainText = Encoding.UTF8.GetString(decryptedText);
                }

                using (var memoryStream = new MemoryStream(pwd))
                {
                    using (var cryptoStream = new CryptoStream(memoryStream, aes.CreateDecryptor(aes.Key, aes.IV), CryptoStreamMode.Read))
                    {
                        using (StreamReader rdr = new StreamReader(cryptoStream))
                        {
                            plainText = rdr.ReadToEnd();
                        }
                    }
                }
            }

            return plainText;
        }
    }

    public class EncyptionKey
    {
        public string Key { get; set; }

        public string IV { get; set; }
    }
}
