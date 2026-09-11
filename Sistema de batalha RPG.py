class Personagem:
    def __init__(self, nome, vida, forca, defesa):
        self.nome = nome
        self.vida = vida
        self.forca = forca
        self.defesa = defesa
    # TODO: Implemente atacar(self, outro_personagem) aqui
# ---- CÓDIGO DE TESTE ---
    def atacar(self, outro_personagem):
        dano = forca/2
        
        if outro_personagem.defesa >= self.forca:
            print(f"{self.nome} atacou {outro_personagem.nome}, mas não causou dano.")
        elif outro_personagem.defesa < self.forca:
            print(f"{self.nome} acertou o ataque, {outro_personagem.nome} perdeu {dano} PV")
            outro_personagem.vida = outro_personagem.vida - dano
        elif outro_personagem.vida <= 0:
            print(f"{inimigo.nome} já está morto. Não é possível atacá-lo.")
            return

p1 = Personagem("Guerreiro", vida=50, forca=15, defesa=5)
p2 = Personagem("Mago", vida=20, forca=10, defesa=2)
p1.atacar(p2)
p1.atacar(p2)
p1.atacar(p2)      # Tentativa de atacar o alvo já morto