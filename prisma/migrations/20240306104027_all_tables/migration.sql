-- CreateTable
CREATE TABLE "Clients" (
    "client_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("client_id")
);

-- CreateTable
CREATE TABLE "Properties" (
    "property_id" SERIAL NOT NULL,
    "property_type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "num_rooms" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("property_id")
);

-- CreateTable
CREATE TABLE "PropertyFeatures" (
    "feature_id" SERIAL NOT NULL,
    "property_id" INTEGER NOT NULL,
    "feature_name" TEXT NOT NULL,

    CONSTRAINT "PropertyFeatures_pkey" PRIMARY KEY ("feature_id")
);

-- CreateTable
CREATE TABLE "PropertyDocuments" (
    "document_id" SERIAL NOT NULL,
    "property_id" INTEGER NOT NULL,
    "document_name" TEXT NOT NULL,
    "document_url" TEXT NOT NULL,

    CONSTRAINT "PropertyDocuments_pkey" PRIMARY KEY ("document_id")
);

-- CreateTable
CREATE TABLE "Agents" (
    "agent_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "commission_rate" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "Agents_pkey" PRIMARY KEY ("agent_id")
);

-- CreateTable
CREATE TABLE "PropertyCategories" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "PropertyCategories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "transaction_id" SERIAL NOT NULL,
    "property_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "agent_id" INTEGER NOT NULL,
    "transaction_type" TEXT NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL(20,2) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "PropertyImages" (
    "image_id" SERIAL NOT NULL,
    "property_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Clients_client_id_key" ON "Clients"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_email_key" ON "Clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_phone_key" ON "Clients"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Properties_property_id_key" ON "Properties"("property_id");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyFeatures_feature_id_key" ON "PropertyFeatures"("feature_id");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyDocuments_document_id_key" ON "PropertyDocuments"("document_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agents_agent_id_key" ON "Agents"("agent_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agents_email_key" ON "Agents"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Agents_phone_key" ON "Agents"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyCategories_category_id_key" ON "PropertyCategories"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_transaction_id_key" ON "Transactions"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyImages_image_id_key" ON "PropertyImages"("image_id");

-- AddForeignKey
ALTER TABLE "PropertyFeatures" ADD CONSTRAINT "PropertyFeatures_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyDocuments" ADD CONSTRAINT "PropertyDocuments_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Clients"("client_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "Agents"("agent_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyImages" ADD CONSTRAINT "PropertyImages_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;
