class Personagem:
    def __init__(self, nome: str, vida: float, forca: int, defesa: int):
        self.nome = nome
        self.vida = vida
        self.forca = forca
        self.defesa = defesa
    # TODO: Implemente atacar(self, outro_personagem) aqui
# ---- CÓDIGO DE TESTE ---
    def atacar(self, outro_personagem):
        dano = self.forca
        if outro_personagem.vida <= 0:
            print(f"{outro_personagem.nome} já está morto. Não é possível atacá-lo.")
        elif dano >= outro_personagem.vida and outro_personagem.vida > 0:
            print(f"{self.nome} matou {outro_personagem.nome} causando {dano} de dano")
            outro_personagem.vida = 0
        elif outro_personagem.defesa < self.forca and outro_personagem.vida > 0:
            print(f"{self.nome} acertou o ataque, {outro_personagem.nome} perdeu {dano} PV")
            outro_personagem.vida = outro_personagem.vida - dano

p1 = Personagem("Guerreiro", vida=50, forca=15, defesa=5)
p2 = Personagem("Mago", vida=20, forca=10, defesa=2)
p1.atacar(p2)
p1.atacar(p2)
p1.atacar(p2)      # Tentativa de atacar o alvo já morto